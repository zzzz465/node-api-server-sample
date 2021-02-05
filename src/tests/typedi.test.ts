import 'reflect-metadata'
import { injectable, inject, container } from 'tsyringe'

abstract class ParentClass {
    abstract foo(): string
}

@injectable()
class ChildClass implements ParentClass {
    foo() {
        return '42'
    }
}

@injectable()
class OtherChildClass implements ParentClass {
    foo() {
        return '420'
    }
}

@injectable()
class DIClass {
    constructor(
        @inject(ChildClass)
        private fooClass: ParentClass
    ) { }

    print() {
        return this.fooClass.foo()
    }
}

test('typedi testing', () => {
    const diClassInstance = container.resolve(DIClass)
    const text = diClassInstance.print()
    expect(text).toBe('42')
})
