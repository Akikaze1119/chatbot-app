import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { UseFormReturn } from 'react-hook-form';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<any>;
    label: string;
  };
} = {
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

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

import { FieldValues } from 'react-hook-form';

interface IRadioGroupRatingProps {
  formControls: UseFormReturn<{ score: number }>;
}

export default function RadioGroupRating({ formControls }: IRadioGroupRatingProps) {
  const { setValue } = formControls;

  const handleScoreChange = (_event: React.MouseEvent<HTMLSpanElement>, newScore: number) => {
    setValue('score', newScore);
  };

  return (
    <StyledRating
      IconContainerComponent={IconContainer}
      getLabelText={(score) => customIcons[score].label}
      highlightSelectedOnly
      onClick={() => handleScoreChange}
      defaultValue={3}
    />
  );
}
