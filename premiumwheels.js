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
            loadScript('https://files.bpcontent.cloud/2024/11/25/17/20241125173935-L2HHMNHD.js', () => {
                // Weitere Aktionen nach dem Laden des Skripts
            });
        });
    });
})();
