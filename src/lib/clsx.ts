/** Minimal classnames helper — joins truthy string args with spaces. */
export function clsx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}
