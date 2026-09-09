import { readFileSync, existsSync } from 'fs';

export function readDockerSecret(
  secretName: string,
  defaultValue: string | null = null,
) {
  const secretPath = `/run/secrets/${secretName}`;
  if (existsSync(secretPath)) {
    try {
      return readFileSync(secretPath, 'utf-8').trim();
    } catch (error) {
      console.error('fail to read docker secret', error);
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}
