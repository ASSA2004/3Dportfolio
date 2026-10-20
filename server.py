"""Local preview. Run: python server.py (open http://localhost:4173)."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import mimetypes

mimetypes.add_type('text/javascript', '.js')
mimetypes.add_type('model/gltf-binary', '.glb')
os.chdir(Path(__file__).resolve().parent)
if __name__ == '__main__':
    print('Sadiq studio: http://localhost:4173', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4173), SimpleHTTPRequestHandler).serve_forever()
