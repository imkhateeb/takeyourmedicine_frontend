 const generateRandom6DigitNumber = () => {
   const min = 100000; // Minimum value (100000)
   const max = 999999; // Maximum value (999999)

   // Use Math.random() to generate a random number between min and max (inclusive)
   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

   return randomNumber;
}
export default generateRandom6DigitNumber;