import { useEffect, useState } from 'react';

export default function KofiWidget() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.kofiWidgetOverlay.draw('fityannugroho', {
      type: 'floating-chat',
      'floating-chat.donateButton.text': 'Tip me',
      'floating-chat.donateButton.background-color': '#5253a0',
      'floating-chat.donateButton.text-color': '#fff',
    });
  }, [loaded]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
