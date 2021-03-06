import React from 'react'
import {render} from 'ink'
import Compile from '../containers/Compile'
import {Serve} from '../containers/Serve'
import type {Bud} from '@roots/bud-typings'
import type {Instance} from 'ink'

/**
 * ## bud.cli
 *
 * Ink application controller.
 */
export class Runner {
  /** Bud reference */
  public bud: Bud

  /**
   * ## bud.cli.instance
   *
   * Ink instance
   */
  public instance: Instance

  /**
   * Class constructor.
   */
  constructor(bud: Bud) {
    this.bud = bud
    this.run = this.run.bind(this)
  }

  public init(): void {
    return
  }

  /**
   * Run the compilation.
   */
  public run = function (): void {
    this.instance = this.bud.mode.is('development')
      ? render(<Serve bud={this.bud} />)
      : render(<Compile bud={this.bud} />)
  }

  public kill = function (): void {
    this.instance.quit()
  }
}
