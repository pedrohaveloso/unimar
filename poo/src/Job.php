<?php

namespace POO;

class Job implements Registrable
{
    /** @var Professional[] */
    private array $registers = [];

    public function __construct(public readonly string $name)
    {
    }

    public function register(Professional ...$professional): void
    {
        array_push($this->registers, ...$professional);
    }

    public function getAllProfessionalsToShow(): string
    {
        return 'Profissionais cadastrados na vaga: '
            . PHP_EOL
            . PHP_EOL
            . join(
                PHP_EOL,
                array_map(
                    fn(Person $register): string => $register->getDataToShow(),
                    $this->registers
                )
            )
            . PHP_EOL
            . PHP_EOL
            . 'No total, ' . count($this->registers) . ' pessoas estão cadastrados na vaga.'
            . PHP_EOL;
    }
}
