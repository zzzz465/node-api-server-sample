import 'reflect-metadata'
import { Container, Inject, InjectMany, Service } from 'typedi'

abstract class ParentClass {
    abstract foo(): string
}

@Service("ChildClass")
class ChildClass implements ParentClass {
    foo() {
        return '42'
    }
}

@Service("OtherChildClass")
class OtherChildClass implements ParentClass {
    foo() {
        return '420'
    }
}

@Service()
class DIClass {
    constructor(
        @Inject("ChildClass")
        private fooClass: ParentClass
    ) { }

    print() {
        return this.fooClass.foo()
    }
}

test('typedi testing', () => {
    const diClassInstance = Container.get(DIClass)
    const text = diClassInstance.print()
    expect(text).toBe('42')
})
