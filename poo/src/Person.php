<?php

namespace POO;

use DateTime;

abstract class Person
{
    protected readonly string $uniqueId;

    public function __construct(
        protected readonly string $name,
        protected readonly DateTime $birth,
    ) {
        $this->uniqueId = uniqid();
    }

    abstract public function getDataToShow(): string;
}
