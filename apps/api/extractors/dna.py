import json
import os
import sys
from openai import OpenAI
from dotenv import load_dotenv

# Add backend directory to sys.path so we can import schema
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from schema.models import CanonicalNode

load_dotenv()

class DNAExtractor:
    def __init__(self):
        # Initialize the OpenAI client pointing to OpenRouter
        self.client = OpenAI(
            api_key=os.environ.get("OPENROUTER_API_KEY"),
            base_url="https://openrouter.ai/api/v1",
        )

    def extract_node(self, technology_name: str, text_context: str) -> CanonicalNode:
        """
        Uses xAI to extract the Knowledge DNA from the provided context.
        """
        # Get the JSON schema of CanonicalNode to enforce structure
        schema_json = CanonicalNode.model_json_schema()
        
        prompt = f"""
        You are a computer science historian extracting data for the Evolith engine.
        Extract the formal technological profile, lifecycle, and evolutionary edges for '{technology_name}' 
        based strictly on the following text. 
        Focus heavily on the 'Knowledge DNA' (paradigms, memory model, type system, target domains).
        For outbound_edges, focus on what this technology evolved into, influenced, or obsoleted. 
        If it evolved from something, list the 'mutations' (architectural features added/removed).

        Text Context:
        {text_context[:15000]} # Truncated to avoid massive context windows for now
        """
        
        system_prompt = f"""
        You must output ONLY valid JSON that perfectly adheres to the following JSON schema.
        Do not include any markdown formatting or code blocks like ```json.
        Schema:
        {json.dumps(schema_json)}
        """
        
        response = self.client.chat.completions.create(
            model="x-ai/grok-4.5",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0,
            max_tokens=4000
        )
        
        json_content = response.choices[0].message.content
        return CanonicalNode.model_validate_json(json_content)
