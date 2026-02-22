
import re

SSH_FAIL = re.compile(r"Failed password")
SSH_OK   = re.compile(r"Accepted password")
FIREWALL = re.compile(r"DROP|ACCEPT|OUTBOUND|INBOUND", re.IGNORECASE)
IDS      = re.compile(r"Alert|scan|intrusion", re.IGNORECASE)
MALWARE  = re.compile(r"malware|trojan|virus", re.IGNORECASE)
WEB      = re.compile(r"GET|POST|HTTP/", re.IGNORECASE)
SYSTEM   = re.compile(r"sudo|su:|useradd", re.IGNORECASE)

def classify_line(line):
    l=line.lower()
    if SSH_FAIL.search(line) or SSH_OK.search(line): return "ssh"
    if FIREWALL.search(line): return "firewall"
    if IDS.search(line): return "ids"
    if MALWARE.search(line): return "malware"
    if WEB.search(line): return "web"
    if SYSTEM.search(line): return "system"
    return "unknown"

def parse_line(line):
    return {"raw":line, "type": classify_line(line)}
