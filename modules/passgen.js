module.exports = class Passwd {
    _LOWER_ENG = 'abcdefghijklmnopqrstuvwxyz'
    _UPPER_ENG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    _LOWER_RU = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    _UPPER_RU = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
    _SYMBOLS = `!@#$%-^&*()_+~"№;%:?=[]{}\|/,.\'<>`
    _DIGIT = '0123456789'

    constructor(length) {
        this.length = length;
    }

    get length() {
        return this._length
    }

    set length(value) {
        if (value === 0) {
            throw new Error(`Заданная длинна (${value}) недоступна для генерации`)
        }
        this._length = value
    }

    generate(settings) {
        let pass = "";
        const {LC_EN, LC_RU, UC_EN, UC_RU, symbol, digit, repeat} = settings
        const char_set =
            `${LC_EN ? this._LOWER_ENG : ""}${symbol ? this._SYMBOLS : ""}${LC_RU ? this._LOWER_RU : ""}${symbol ? this._SYMBOLS : ""}${UC_EN ? this._UPPER_ENG : ""}${UC_RU ? this._UPPER_RU : ""}${symbol ? this._SYMBOLS : ""}${digit ? this._DIGIT : ""}`
                .split("")

        while (pass.length !== this._length) {
            let index = Math.floor(Math.random() * char_set.length)
            if (!repeat && pass.indexOf(char_set[index].toLowerCase()) !== -1) {
                continue
            } else {
                pass += char_set[index]
            }
        }
        return pass
    }
}


