
export default function pinInput (){
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        const value = input.value;
        const maxLength = input.maxLength;
        if (value.length >= maxLength) {
            const nextInput = input.nextElementSibling as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
            }
        } else if (value.length === 0) {
            const prevInput = input.previousElementSibling as HTMLInputElement;
            if (prevInput) {
                prevInput.focus();
            }
        }
    }
    return(
         <div className="pinInputContainer">
          <input type="tel" pattern="[0-9]*" inputMode="numeric" size={1} maxLength={1} onInput={handleInput} />
          <input type="tel" pattern="[0-9]*" inputMode="numeric" size={1} maxLength={1} onInput={handleInput} />
          <input type="tel" pattern="[0-9]*" inputMode="numeric" size={1} maxLength={1} onInput={handleInput} />
          <input type="tel" pattern="[0-9]*" inputMode="numeric" size={1} maxLength={1} onInput={handleInput} />
        </div>
    );
}