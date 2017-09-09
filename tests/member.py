import base
import argparse

from helpers import config

headers = config.headers
url = config.member_url

def main():
  parser = argparse.ArgumentParser()
  subparsers = parser.add_subparsers()

  add_parser = subparsers.add_parser('add', help='add a member')
  add_parser.add_argument(dest='cmd', action='store_const', const='add')
  add_parser.add_argument('-u', '--username', required=True)
  add_parser.add_argument('-p', '--password', required=True)
  add_parser.add_argument('-t', '--token', required=True)

  delete_parser = subparsers.add_parser('delete', help='delete a member')
  delete_parser.add_argument(dest='cmd', action='store_const', const='delete')
  delete_parser.add_argument('-u', '--username', required=True)
  delete_parser.add_argument('-t', '--token', required=True)

  get_parser = subparsers.add_parser('get', help='get a member(s)')
  get_parser.add_argument(dest='cmd', action='store_const', const='get')
  get_parser.add_argument('-u', '--username', nargs='?', default=None)
  get_parser.add_argument('-t', '--token', required=True)

  args = parser.parse_args()
  ret = None
  if args.cmd == 'add':
    print add(args.username, args.password, args.token)
  elif args.cmd == 'delete':
    print delete(args.username, args.token)
  elif args.cmd == 'get':
    print get(args.username, args.token)

def add(username, password, token):
  payload = base.build_payload(newUsername=username, newPassword=password, token=token)
  ret = base.post(url, headers, payload) 

  return ret

def get(username, token):
  payload = base.build_payload(username=username, token=token)
  ret = base.get(url, headers, payload) 

  return ret

def delete(username, token):
  payload = base.build_payload(username=username, token=token)
  ret = base.delete(url, headers, payload) 

  return ret

if __name__ == "__main__":
  main()
