from pyngrok import ngrok
import time

# Open a HTTP tunnel on the default port 80
# Change this to match your local server port (8000)
public_url = ngrok.connect(8000)
print(f"Ngrok tunnel established! Public URL: {public_url}")
print("Your JonesCoin website is now accessible externally at the URL above.")
print("Press Ctrl+C to close the tunnel.")

try:
    # Keep the script running
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Closing Ngrok tunnel...")
    ngrok.kill()