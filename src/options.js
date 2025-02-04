export const categoryOptions = [
  { value: 'show all', label: 'Show all' },
  { value: 'found', label: 'Found' },
  { value: 'free', label: 'Free' },
  { value: 'lost', label: 'Lost' },
  { value: 'sell', label: 'Sell' },
];

export const byGenderOptions = [
  { value: 'show all', label: 'Show all' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'multiple', label: 'Multiple' },
  { value: 'unknown', label: 'Unknown' },
];

export const byTypeOptions = [
  { value: 'show all', label: 'Show all' },
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'monkey', label: 'Monkey' },
  { value: 'bird', label: 'Bird' },
  { value: 'snake', label: 'Snake' },
  { value: 'turtle', label: 'Turtle' },
  { value: 'lizard', label: 'Lizard' },
  { value: 'frog', label: 'Frog' },
  { value: 'fish', label: 'Fish' },
  { value: 'ants', label: 'Ants' },
  { value: 'bees', label: 'Bees' },
  { value: 'butterfly', label: 'Butterfly' },
  { value: 'spider', label: 'Spider' },
  { value: 'scorpion', label: 'Scorpion' },
];

export const getCustomStyles = width => ({
  control: provided => ({
    ...provided,
    borderRadius: '30px',
    height: '42px',
    width,
    // width: '143px',
    paddingLeft: '4px',
    paddingRight: '4px',

    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '129%',
    letterSpacing: '-0.03em',

    // padding: '4px',
    margin: '0',
    color: '#262626',
    backgroundColor: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    ':focus': {
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      color: '#121417',
    },
    ':active': {
      border: 'none',
      boxShadow: 'none',
      color: '#121417',
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: '#262626',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '15px',

    padding: '4px 0 4px 4px',
    border: 'none',
    boxShadow: 'none',
    zIndex: '1900',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#f6b83d' : 'rgba(38, 38, 38, 0.6)',
    ':active': {
      backgroundColor: 'transparent',
    },
    ':focus': {
      backgroundColor: 'transparent',
    },
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '129%',
    letterSpacing: '-0.03em',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
});

// export const customStyles = {
//   control: provided => ({
//     ...provided,
//     borderRadius: '30px',
//     height: '42px',
//     width: '143px',
//     paddingLeft: '4px',
//     paddingRight: '4px',

//     fontWeight: '500',
//     fontSize: '14px',
//     lineHeight: '129%',
//     letterSpacing: '-0.03em',

//     // padding: '4px',
//     margin: '0',
//     color: '#262626',
//     backgroundColor: '#fff',
//     border: 'none',
//     outline: 'none',
//     boxShadow: 'none',
//     cursor: 'pointer',
//     ':focus': {
//       border: 'none',
//       outline: 'none',
//       boxShadow: 'none',
//       color: '#121417',
//     },
//     ':active': {
//       border: 'none',
//       boxShadow: 'none',
//       color: '#121417',
//     },
//   }),
//   menu: provided => ({
//     ...provided,
//     borderRadius: '15px',

//     padding: '4px 0 4px 4px',
//     border: 'none',
//     boxShadow: 'none',
//     zIndex: '1900',
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     color: state.isSelected ? '#f6b83d' : 'rgba(38, 38, 38, 0.6)',
//     ':active': {
//       backgroundColor: 'transparent',
//     },
//     ':focus': {
//       backgroundColor: 'transparent',
//     },
//     fontWeight: '500',
//     fontSize: '14px',
//     lineHeight: '129%',
//     letterSpacing: '-0.03em',
//     backgroundColor: '#ffffff',
//     cursor: 'pointer',
//   }),
//   indicatorSeparator: () => ({
//     display: 'none',
//   }),
// };
