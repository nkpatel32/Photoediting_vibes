import './ScrollIndicator.css';

export default function ScrollIndicator({ progress }) {
  return (
    <div className="scroll-indicator-wrap">
      <div className="scroll-indicator-bar" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
