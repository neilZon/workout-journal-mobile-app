import React from 'react';
import { Button } from 'native-base';

const WorkoutTemplateActions = () => {
  return (
    <Button
      onPress={() => console.log('template actions')}
      borderRadius={16}
      backgroundColor="red.500"
    >
      Delete
    </Button>
  );
};

export default WorkoutTemplateActions;
