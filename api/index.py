import sys
import os

# Add apps/api to PYTHONPATH so absolute imports inside apps/api work on Vercel
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "apps", "api")))

from main import app
