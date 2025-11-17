import { describe, it, expect } from 'vitest'
import { minutesToTimeString } from '../timeFormater'

describe('minutesToTimeString', () => {
    it('deve retornar uma string vazia para valores nulos, indefinidos ou negativos', () => {
        expect(minutesToTimeString(null)).toBe('')
        expect(minutesToTimeString(undefined)).toBe('')
        expect(minutesToTimeString(-10)).toBe('')
    })

    it('deve retornar "00:00" para 0 minutos', () => {
        expect(minutesToTimeString(0)).toBe('00:00')
    })

    it('deve formatar corretamente tempos menores que uma hora, com padding de zero', () => {
        expect(minutesToTimeString(1)).toBe('00:01')
        expect(minutesToTimeString(45)).toBe('00:45')
    })

    it('deve formatar corretamente valores de horas exatas', () => {
        expect(minutesToTimeString(60)).toBe('01:00')
        expect(minutesToTimeString(120)).toBe('02:00')
    })

    it('deve formatar corretamente valores com horas e minutos', () => {
        expect(minutesToTimeString(75)).toBe('01:15')
        expect(minutesToTimeString(150)).toBe('02:30')
    })

    it('deve lidar com valores grandes corretamente', () => {
        expect(minutesToTimeString(1439)).toBe('23:59')
    })
})