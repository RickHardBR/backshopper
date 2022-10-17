export const formatDate = ( data: Date, style: any) => {
  const date = data.toLocaleDateString(
    "pt-BR", { dateStyle: style }
  );
  
  return date;
};