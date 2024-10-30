<?php

namespace POO;

use DateTime;

class Professional extends Person
{
    public static function fromArray(array $professional): Professional
    {
        return new Professional(
            $professional['name'],
            date_create_from_format('Y-m-d', $professional['birth']),
            $professional['resume'],
            $professional['linkedIn'],
        );
    }

    public function __construct(
        string $name,
        DateTime $birth,
        protected readonly string $resume,
        protected readonly string $linkedIn,
    ) {
        parent::__construct($name, $birth);
    }

    public function getDataToShow(): string
    {
        return
            "Profissional { " . PHP_EOL
            . "    Nome: {$this->name}, " . PHP_EOL
            . "    Nascimento: {$this->birth->format('d/m/Y')}, " . PHP_EOL
            . "    Currículo: {$this->resume}, " . PHP_EOL
            . "    LinkedIn: {$this->linkedIn}, " . PHP_EOL
            . "    ID: {$this->uniqueId} " . PHP_EOL
            . "}";
    }
}
