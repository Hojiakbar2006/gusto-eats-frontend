export function FormatPrice(price) {
  // Sonlarni O'zbek tilida shakllantirish
  const formattedPrice = new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
  }).format(price);

  return formattedPrice;
}
