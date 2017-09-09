import base
import argparse

from helpers import config

headers = config.headers
url = config.account_url

def main():
  parser = argparse.ArgumentParser()
  subparsers = parser.add_subparsers()

  create_parser = subparsers.add_parser('create', help='create a user')
  create_parser.add_argument(dest='cmd', action='store_const', const='create')
  create_parser.add_argument('-u', '--username', required=True)
  create_parser.add_argument('-p', '--password', required=True)
  create_parser.add_argument('-c', '--code', required=True)

  update_parser = subparsers.add_parser('update', help='update a user\'s password')
  update_parser.add_argument(dest='cmd', action='store_const', const='update')
  update_parser.add_argument('-p', '--password', required=True)
  update_parser.add_argument('-t', '--token', required=True)

  args = parser.parse_args()

  if args.cmd == 'create':
    print createUser(args.username, args.password, args.code)
  elif args.cmd == 'update':
    print modifyUser(args.password, args.token)


def createUser(username, password, code):
  payload = base.build_payload(newUsername=username, newPassword=password, code=code)
  ret = base.post(url, headers, payload) 

  return ret

def modifyUser(password, token):
  payload = base.build_payload(password=password, token=token)
  ret = base.put(url, headers, payload) 

  return ret

if __name__ == "__main__":
  main()
