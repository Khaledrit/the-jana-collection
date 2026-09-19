#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean = path.split('?', 1)[0].split('#', 1)[0].lstrip('/')
        target = ROOT / clean
        if target.is_file():
            return str(target)
        return str(ROOT / 'index.html')

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    print('Jana Travel: http://127.0.0.1:4173')
    ThreadingHTTPServer(('127.0.0.1', 4173), Handler).serve_forever()
