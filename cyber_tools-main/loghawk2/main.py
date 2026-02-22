import os
import json
import argparse
from pathlib import Path

from utils.loader import stream_logs
from utils.parser import parse_line
from utils.output import save_report, clear_screen

from analyzers import ssh, firewall, ids, malware, web, system, ml


CONFIG_PATH = Path("config/settings.json")
REPORT_JSON = Path("report.json")


# ===== COLORS =====
RESET = "\033[0m"
BOLD = "\033[1m"

FG_RED = "\033[31m"
FG_GREEN = "\033[32m"
FG_YELLOW = "\033[33m"
FG_BLUE = "\033[34m"
FG_MAGENTA = "\033[35m"
FG_CYAN = "\033[36m"
FG_WHITE = "\033[37m"


def color(text: str, fg: str = FG_WHITE, bold: bool = False) -> str:
    prefix = ""
    if bold:
        prefix += BOLD
    prefix += fg
    return f"{prefix}{text}{RESET}"


# ===== CONFIG =====
def load_cfg() -> dict:
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)

    return {
        "ssh": {"bruteforce_threshold": 5, "suspicious_hours": {"start": 0, "end": 6}, "ml_enabled": True},
        "firewall": {"portscan_threshold": 10, "large_outbound_threshold": 1000000},
        "ids": {"enabled": True},
        "malware": {"enabled": True},
        "web": {"enabled": True},
        "system": {"enabled": True},
        "ml": {"contamination": 0.1},
    }


def banner():
    print(color("┌" + "─" * 50 + "┐", FG_CYAN))
    print(color("│" + " " * 13 + "LOGHAWK 2.0 - SIEM ANALYZER" + " " * 11 + "│", FG_CYAN, bold=True))
    print(color("└" + "─" * 50 + "┘", FG_CYAN))
    print(color("  Multi-log Security Analyzer (SSH, FW, IDS, Web, AV)", FG_YELLOW))
    print()


def choose_log_file() -> str:
    print(color("[+] Enter path to log file:", FG_CYAN))
    print(color("    e.g. /var/log/auth.log, /var/log/secure, custom.log", FG_BLUE))
    path = input(color("    Path: ", FG_GREEN)).strip()
    return path


# ===== CORE ANALYSIS =====
def run_analysis(path: str, interactive=True):

    clear_screen()
    banner()

    if not os.path.exists(path):
        print(color(f"[X] File not found: {path}", FG_RED, bold=True))
        if interactive:
            input("\nPress ENTER to return...")
        return

    cfg = load_cfg()

    print(color(f"[+] Analyzing log: {path}", FG_CYAN))
    print(color("[*] Parsing events...", FG_BLUE))

    events = [parse_line(line) for line in stream_logs(path)]
    events = [e for e in events if e is not None]

    print(color(f"[+] Parsed {len(events)} events.", FG_GREEN))
    print(color("[*] Running analyzers...", FG_BLUE))

    results = {
        "ssh": ssh.analyze(events, cfg["ssh"]),
        "firewall": firewall.analyze(events, cfg["firewall"]),
        "ids": ids.analyze(events, cfg["ids"]),
        "malware": malware.analyze(events, cfg["malware"]),
        "web": web.analyze(events, cfg["web"]),
        "system": system.analyze(events, cfg["system"]),
        "ml": ml.analyze(events, cfg["ml"]),
    }

    save_report(results)

    print()
    print(color("=== ANALYSIS SUMMARY ===", FG_MAGENTA, bold=True))

    for key in ["ssh", "firewall", "ids", "malware", "web", "system", "ml"]:

        count = len(results.get(key, []))

        if count == 0:
            c = color(f"{count} alerts", FG_GREEN)
        else:
            c = color(f"{count} alerts", FG_RED)

        print(f"  {key.upper():9}: {c}")

    print()
    print(color("[+] Detailed results saved to report.json and report.txt", FG_CYAN))

    if interactive:
        input("\nPress ENTER to return to menu...")


# ===== VIEW REPORT =====
def view_last_report():

    clear_screen()
    banner()

    if not REPORT_JSON.exists():
        print(color("[!] No report.json found.", FG_YELLOW))
        input("\nPress ENTER to return...")
        return

    with open(REPORT_JSON, "r") as f:
        data = json.load(f)

    results = data.get("results", {})

    print(color("Last Report Overview:", FG_MAGENTA, bold=True))
    print()

    for section, alerts in results.items():
        print(color(f"[{section.upper()}] {len(alerts)} alert(s)", FG_CYAN if alerts else FG_GREEN))

    input("\nPress ENTER to return...")


# ===== MENU =====
def main_menu():

    while True:

        clear_screen()
        banner()

        print(color("  1) Analyze a log file", FG_GREEN, bold=True))
        print(color("  2) View last report summary", FG_BLUE))
        print(color("  3) Exit", FG_RED))
        print()

        choice = input(color("Select option (1-3): ", FG_WHITE, bold=True)).strip()

        if choice == "1":

            path = choose_log_file()
            run_analysis(path)

        elif choice == "2":

            view_last_report()

        elif choice == "3":

            clear_screen()
            print(color("Goodbye! Stay secure.", FG_GREEN, bold=True))
            break

        else:

            print(color("[!] Invalid choice", FG_RED))
            input("Press ENTER...")


# ===== CLI MODE =====
def run_cli():

    parser = argparse.ArgumentParser()

    parser.add_argument("--file", help="log file path")
    parser.add_argument("--log-type", help="log type (optional)")

    args = parser.parse_args()

    if args.file:
        run_analysis(args.file, interactive=False)
        return True

    return False


# ===== ENTRY POINT =====
if __name__ == "__main__":

    if not run_cli():
        main_menu()
