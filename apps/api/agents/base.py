"""
Anti Gravity — Base Agent

Abstract base class for all specialized agents in the system.
Provides common LLM invocation, memory, and tool integration.
"""

from typing import Any, Optional, Dict
from pydantic import BaseModel
import json
from openai import AsyncOpenAI
from config import settings

class BaseAgent:
    def __init__(
        self,
        name: str,
        system_prompt: str,
        model: str = settings.DEFAULT_MODEL,
        temperature: float = 0.2,
    ):
        self.name = name
        self.system_prompt = system_prompt
        self.model = model
        self.temperature = temperature
        
        # Initialize client (using OpenRouter or OpenAI depending on config)
        if settings.OPENROUTER_API_KEY:
            self.client = AsyncOpenAI(
                base_url="https://openrouter.ai/api/v1",
                api_key=settings.OPENROUTER_API_KEY,
            )
        else:
            self.client = AsyncOpenAI(
                api_key=settings.OPENAI_API_KEY,
            )

    async def execute(
        self,
        prompt: str,
        response_format: Optional[type[BaseModel]] = None,
        tools: Optional[list[Dict[str, Any]]] = None,
    ) -> Any:
        """
        Executes the agent with the given prompt.
        If response_format is provided, forces JSON output structured to that Pydantic model.
        """
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": prompt},
        ]
        
        # We use a simple JSON mode instruction if response_format is provided
        if response_format:
            messages[0]["content"] += f"\n\nYou MUST respond with valid JSON that matches this schema: {json.dumps(response_format.model_json_schema())}"

        kwargs = {
            "model": self.model,
            "messages": messages,
            "temperature": self.temperature,
        }
        
        if response_format:
            kwargs["response_format"] = {"type": "json_object"}
            
        if tools:
            kwargs["tools"] = tools

        response = await self.client.chat.completions.create(**kwargs)
        content = response.choices[0].message.content
        
        if response_format and content:
            try:
                # Parse the JSON string into the Pydantic model
                data = json.loads(content)
                return response_format(**data)
            except Exception as e:
                raise ValueError(f"Failed to parse agent output into {response_format.__name__}: {e}\nRaw output: {content}")
                
        return content
