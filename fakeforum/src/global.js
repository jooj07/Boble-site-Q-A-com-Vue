export const hasWhiteSpace = (s) => {
  console.log("Veio da função ", s, '-------', /\s/g.test(s))
  
  return /\s/g.test(s);
};
export const storageName = "__$user$__";
