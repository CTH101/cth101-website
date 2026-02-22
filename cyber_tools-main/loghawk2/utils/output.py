
import json, datetime, os, platform

def clear_screen():
    os.system("cls" if platform.system().lower().startswith("win") else "clear")

def save_report(data):
    ts=datetime.datetime.now().isoformat()
    with open("report.json","w") as f:
        json.dump({"timestamp":ts,"results":data}, f, indent=4)

    with open("report.txt","w") as f:
        f.write("LogHawk 2.0 Report\n")
        f.write(json.dumps(data, indent=4))
