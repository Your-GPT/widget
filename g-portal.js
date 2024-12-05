(function() {
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => callback && callback();
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.body.appendChild(script);
    }

    loadScript('https://your-gpt.github.io/widget/config.js', () => {
        loadScript(config.injectUrl, () => {
            loadScript('https://files.bpcontent.cloud/2024/12/05/18/20241205184019-RFYJSDP4.js', () => {
                // Weitere Aktionen nach dem Laden des Skripts
            });
        });
    });
})();
