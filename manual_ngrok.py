import subprocess
import sys
import os
import time

# Check if ngrok is in PATH or in the current directory
def find_ngrok():
    try:
        # Try to run ngrok version to check if it's in PATH
        subprocess.run(["ngrok", "--version"], check=True, capture_output=True)
        return "ngrok"
    except (subprocess.CalledProcessError, FileNotFoundError):
        # Check if ngrok.exe exists in the current directory
        if os.path.exists("ngrok.exe"):
            return "./ngrok.exe"
        else:
            print("Ngrok not found. Please download it from https://ngrok.com/download")
            print("Extract the ngrok.exe file to this directory and run this script again.")
            sys.exit(1)

def start_ngrok_tunnel(port=8000):
    ngrok_path = find_ngrok()
    
    # Start ngrok tunnel
    process = subprocess.Popen(
        [ngrok_path, "http", str(port)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    print(f"Ngrok tunnel started for port {port}")
    print("To find your public URL, open http://localhost:4040 in your browser")
    print("Your JonesCoin website is now accessible externally")
    print("Press Ctrl+C to close the tunnel")
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Closing Ngrok tunnel...")
        process.terminate()

if __name__ == "__main__":
    start_ngrok_tunnel()