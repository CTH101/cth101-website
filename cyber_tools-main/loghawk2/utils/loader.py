
def stream_logs(path):
    with open(path, "r", errors="ignore") as f:
        for line in f:
            line=line.strip()
            if line:
                yield line
