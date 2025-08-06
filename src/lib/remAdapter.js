const remAdapter = () => {
    const designWidth = 750; // 设计稿宽度
    const baseSize = 75; // 1rem = 75px
    const setFontSize = () => {
        const clientWidth = document.documentElement.clientWidth;
        // 可添加上限，如 PC 端不缩放
        const fontSize = (clientWidth / designWidth) * baseSize + 'px';
        document.documentElement.style.fontSize = fontSize;
    };

    setFontSize();
    window.addEventListener('resize', setFontSize);
    window.addEventListener('orientationchange', setFontSize); // 处理横竖屏切换
};

export default remAdapter;