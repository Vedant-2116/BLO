import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCreditCard, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { name: 'Shipping', icon: faBox },
    { name: 'Review', icon: faCheckCircle },
    { name: 'Payment', icon: faCreditCard }
    
  ];

  // Inline styles
  const iconStyle = (index) => ({
    color: index === currentStep ? '#000' : index < currentStep ? '#ccc' : '#aaa',
    fontSize: '24px',
  });

  const textStyle = (index) => ({
    fontSize: '14px',
    color: index === currentStep ? '#000' : '#aaa',
    fontWeight: index === currentStep ? 'bold' : 'normal',
  });

  const lineStyle = {
    flex: 1,
    height: '2px',
    backgroundColor: '#ccc',
    margin: '0 8px',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          {index > 0 && <div style={lineStyle}></div>}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FontAwesomeIcon icon={step.icon} style={iconStyle(index)} />
            <div style={textStyle(index)}>{step.name}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
