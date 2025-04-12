import { createParamDecorator, ExecutionContext } from "@nestjs/common";


/**
 * Decorator personalizado para extrair e converter o parâmetro ID da URL para número.
 * 
 * @description
 * Este decorator extrai o parâmetro 'id' da requisição HTTP e o converte para um número.
 * Útil para garantir que IDs sejam sempre tratados como valores numéricos nos controladores.
 * 
 * @param {unknown} _data - Dados passados para o decorator (não utilizado)
 * @param {ExecutionContext} context - Contexto de execução do NestJS
 * @returns {number} ID convertido para número
 * @throws {BadRequestException} Se o ID não puder ser convertido para um número válido
 * 
 * @example
 * ```typescript
 * @Get(':id')
 * findOne(@ParamId() id: number) {
 *   return this.service.findOne(id);
 * }
 * ```
 */
export const ParamId = createParamDecorator(
    (_data: unknown, context: ExecutionContext):number  => {
        const request = context.switchToHttp().getRequest().params.id;
        const numericId: number = parseInt(request, 10);
        
        return numericId;
    }
)