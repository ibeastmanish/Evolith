import sys
import os
import traceback

async def app(scope, receive, send):
    try:
        # Add apps/api to PYTHONPATH so absolute imports inside apps/api work
        sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "apps", "api")))
        
        from main import app as fastapi_app
        
        # Forward the ASGI request to FastAPI
        await fastapi_app(scope, receive, send)
        
    except Exception:
        # If the backend crashes during boot, catch it and return the traceback 
        # so we can see exactly what failed in the browser!
        if scope["type"] == "http":
            error_body = traceback.format_exc().encode("utf-8")
            await send({
                "type": "http.response.start",
                "status": 500,
                "headers": [
                    (b"content-type", b"text/plain"),
                ]
            })
            await send({
                "type": "http.response.body",
                "body": error_body
            })
