
export const cleanPath = (path: string): string => {
  const sep = "/";
  let mount_path = path;
  
  if (mount_path.length >= 1 && !mount_path.endsWith(sep)) {
    mount_path += "/";
  }
  
  return mount_path;
}

export const exitHandler = (signal: string) => {
  console.log(`Received ${signal} signal. Exiting...`);
  process.exit();
}
