import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1745291187399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'user',
            columns:[{
                name:'id',
                type:'int',
                isPrimary:true,
                isGenerated:true,
                generationStrategy:'increment',
                unsigned:true,
            }
        ,
    {
        name:'name',
        type:'varchar',
        isNullable:false,
        length:'100',
    },{
        name:'email',
        type:'varchar',
        isNullable:false,
        isUnique:true,
        length:'100',
    },
{
        name:'password',
        type:'varchar',
        isNullable:false,
        length:'100',
    },{
        name:'birthAt',
        type:'date',
        isNullable:true,
    },{
        name:'createdAt',
        type:'timestamp',
        default:'CURRENT_TIMESTAMP',
    },{
        name:'updatedAt',
        type:'timestamp',
        default:'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },{
        name:'role',
        type:'int',
        default:1,
        enum:['1', '2'],
}]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
