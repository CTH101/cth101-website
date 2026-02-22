
def analyze(events, config):
    # Placeholder detection logic
    alerts=[]
    for e in events:
        # simple demo rule
        if "error" in e["raw"].lower():
            alerts.append({"type": "simple_alert", "raw": e["raw"]})
    return alerts
