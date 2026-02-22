# LogHawk 2.0 – Multi-Log Security Analyzer (SIEM Style)

LogHawk 2.0 is a beginner-friendly security log analyzer that works inside a colored TUI (Text UI).  
It analyzes multiple types of logs:

- SSH logs  
- Firewall logs  
- IDS / IPS alerts  
- Malware / AV logs  
- Web server logs  
- System logs  
- Machine learning anomaly module (basic stub)

All code for the tool is located inside the folder:




## 🚀 How to Download (Beginner Friendly)

### Linux / Kali / Ubuntu:
```bash
wget https://github.com/CHIRAG11SEPT/cyber_tools/archive/refs/heads/main.zip -O cyber_tools.zip
unzip cyber_tools.zip
cd cyber_tools-main/loghawk2
pip install -r requirements.txt
python3 main.py
