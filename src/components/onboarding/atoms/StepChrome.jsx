import { Ic } from '../icons/Ic';
import { ProgressBar } from './ProgressBar';

function StepChrome({ step, onBack, onClose }) {
  return (
    <div className="ob-chrome">
      <ProgressBar step={step} />
      <div className="ob-header">
        <button type="button" className="ob-back" onClick={onBack} aria-label="Back">
          <Ic.ArrowLeft />
          <span>Back</span>
        </button>
        <button type="button" className="ob-close" onClick={onClose} aria-label="Exit onboarding">
          <Ic.X />
        </button>
      </div>
    </div>);

}


export { StepChrome };
