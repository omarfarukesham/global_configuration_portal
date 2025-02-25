// import getCountryCodeFromCurrencyCode from '@/utilities/getCountryCodeFromCurrencyCode';
// import getCountryCodeFromLanguageCode from '@/utilities/getCountryCodeFromLanguageCode';
// import ReactCountryFlag from 'react-country-flag';

// const FlagLabel = ({
//   countryCode,
//   languageCode,
//   currencyCode,
//   label,
//   className,
//   containerClass,
// }) => {
//   const code =
//     countryCode ||
//     getCountryCodeFromLanguageCode(languageCode) ||
//     getCountryCodeFromCurrencyCode(currencyCode);

//   return (
//     <div className={`flex gap-3 items-center ${containerClass}`}>
//       <ReactCountryFlag
//         countryCode={code}
//         svg
//         title={code}
//         className={`rounded-[50%] scale-125 object-cover ${className}`}
//       />
//       {label && label}
//     </div>
//   );
// };

// export default FlagLabel;
