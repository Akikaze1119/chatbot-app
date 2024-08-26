import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

/**
 * MUI Rating component with custom icons and styles
 * https://mui.com/material-ui/react-rating/#radio-group
 */

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color='error' />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color='error' />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color='warning' />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color='success' />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color='success' />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function RadioGroupRating({ formControls }) {
  const { setValue } = formControls;

  const handleScoreChange = (_event, newScore) => {
    setValue('score', newScore);
  };

  return (
    <StyledRating
      IconContainerComponent={IconContainer}
      getLabelText={(score) => customIcons[score].label}
      highlightSelectedOnly
      onChange={handleScoreChange}
    />
  );
}
