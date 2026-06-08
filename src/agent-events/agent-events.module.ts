import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEvent } from './agent-event.entity';
import { AgentEventsService } from './agent-events.service';
import { AgentEventsController } from './agent-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEvent])],
  providers: [AgentEventsService],
  controllers: [AgentEventsController],
  exports: [AgentEventsService],
})
export class AgentEventsModule {}
