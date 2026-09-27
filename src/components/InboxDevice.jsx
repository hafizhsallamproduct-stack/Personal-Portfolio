// Tablet and phone are shown as mobile web: a status bar and the browser's
// address bar above the screen, in the same dark as the desktop's tab bar.
// The phone's status bar makes room for the Dynamic Island. Decorative, so
// hidden from screen readers; the screen image carries the description.
const BrowserTop = ({ island }) => (
  <div className="inbox-browser-top" aria-hidden="true">
    <div className={`inbox-browser-status${island ? ' inbox-browser-status--island' : ''}`}>
      <span>9:41</span>
      {island && <span className="inbox-browser-island"></span>}
      <span className="inbox-browser-battery"></span>
    </div>
    <div className="inbox-browser-url">
      <svg viewBox="0 0 16 16" fill="currentColor" className="inbox-browser-lock">
        <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z" />
      </svg>
      onlinebanking.rhbgroup.com
    </div>
  </div>
);

// A device frame for the RHB Inbox screens.
const InboxDevice = ({ device, showLabel = true }) => (
  <figure className={`inbox-device inbox-device--${device.key}`}>
    <div className="inbox-device-frame">
      {device.key === 'desktop' && (
        <div className="inbox-device-bar" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      {device.key !== 'desktop' && <BrowserTop island={device.key === 'mobile'} />}
      <div className="inbox-device-screen">
        <img src={device.image} alt={device.alt} loading="lazy" decoding="async" />
      </div>
    </div>
    {showLabel && <figcaption className="inbox-caption">{device.label}</figcaption>}
  </figure>
);

export default InboxDevice;
