import React, { useEffect, useRef } from 'react';

const AnuncioLateral = ({ adKey, width, height }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !adKey) return;

    // A mágica: Escrevemos o script do Adsterra diretamente dentro da janela do iframe
    const doc = iframe.contentWindow.document;
    
    const adContent = `
      <!DOCTYPE html>
      <html style="margin:0;padding:0;overflow:hidden;">
        <body style="margin:0;padding:0;background-color:#252525;display:flex;justify-content:center;align-items:center;">
          <script type="text/javascript">
            atOptions = {
              'key' : '${adKey}',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
        </body>
      </html>
    `;

    try {
      doc.open();
      doc.write(adContent);
      doc.close();
    } catch (err) {
      console.error("Erro ao carregar anúncio:", err);
    }

  }, [adKey]); // Recarrega se a chave mudar

  return (
    <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
      <iframe
        ref={iframeRef}
        title="Publicidade"
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden', borderRadius: '8px', background: '#252525' }}
      />
    </div>
  );
};

export default AnuncioLateral;