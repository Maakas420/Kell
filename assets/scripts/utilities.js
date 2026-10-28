function pad(number, digits = 2, prefix = "0") {
  return String(number).padStart(digits, prefix);
}
