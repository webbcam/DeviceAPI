import base
import argparse

from helpers import config

headers = config.headers
url = config.token_url

def main():
  parser = argparse.ArgumentParser()

  parser.add_argument('-u', '--username', required=True)
  parser.add_argument('-p', '--password', required=True)

  args = parser.parse_args()

  print getTok(args.username, args.password)


def getTok(username, password):
  payload = base.build_payload(username=username, password=password)
  ret = base.get(url, headers, payload) 
  if ret and ret['success']:
    return ret['token']
  else:
    return ret 

if __name__ == "__main__":
  main()
