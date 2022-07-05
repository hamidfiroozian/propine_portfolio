import { config } from 'dotenv';
import { get, set } from 'lodash';
import { join } from 'path';
import { existsSync } from 'fs';

config();

export class BaseConfig {
  private readonly baseDir: string;

  constructor(private readonly env: { [k: string]: string | undefined }) {
    let current = __dirname;
    while (!existsSync(join(current, 'node_modules'))) {
      current = join(current, '../');
    }
    this.baseDir = current;
  }

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value || '';
  }

  protected asInt(v: string): number {
    return +v;
  }

  protected asBool(v: string): boolean {
    return ['t', 'true', '1'].includes(v.toLowerCase());
  }

  protected asUrl(
    raw: string,
    convertor?: { [key: string]: (v: string) => number | boolean | string },
  ): {
    host: string;
    port: string;
    protocol: string;
    options: Record<string, unknown>;
  } {
    const url = new URL(raw);
    const opt = {};
    url.searchParams.forEach((v, k) => set(opt, k, v));
    if (convertor) {
      Object.keys(convertor).forEach((k) => {
        const v = get(opt, k);
        if (v != null) {
          set(opt, k, convertor[k](v));
        }
      });
    }
    return {
      host: url.hostname,
      port: url.port,
      protocol: url.protocol,
      options: opt,
    };
  }
}
