import { Component, ElementRef, ViewChild, signal, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-board',
  // imports: [],
  standalone: true,
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  private BOARD_WIDTH = 0;
  private BOARD_HEIGHT = 0;
  private BOARD_OFFSET_X = 0;
  private BOARD_OFFSET_Y = 0;

  grabbingBoard = signal(false);
  scale = signal(1);
  clickedPosition = signal({ x: -1, y: -1 });
  boardPosition = signal({ x: 0, y: 0 });

  private clampPosition(x: number, y: number): { x: number, y: number } {
    if (typeof window === 'undefined') {
      return { x, y }; // Return unchanged position if window is not available
    }
    
    // Calculate boundaries including the offset and accounting for scale
    const minX = -this.BOARD_OFFSET_X * this.scale();
    const maxX = (this.BOARD_WIDTH - this.BOARD_OFFSET_X - window.innerWidth) * this.scale();
    const minY = -this.BOARD_OFFSET_Y * this.scale();
    const maxY = (this.BOARD_HEIGHT - this.BOARD_OFFSET_Y - window.innerHeight) * this.scale();

    return {
      x: Math.max(Math.min(x, maxX), minX),
      y: Math.max(Math.min(y, maxY), minY)
    };
  }

  // Looks at the view DOM and gets the first element that matches the selector
  // in this case, the div with id 'board'
  @ViewChild('board') boardElement!: ElementRef<HTMLDivElement>;

  // After the view has initialized
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      // Initialize board dimensions
      this.BOARD_WIDTH = window.innerWidth * 4;
      this.BOARD_HEIGHT = window.innerHeight * 4;
      this.BOARD_OFFSET_X = window.innerWidth * 1.5;
      this.BOARD_OFFSET_Y = window.innerHeight * 1.5;
    }

    if (this.boardElement) {
      this.boardElement.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault(); // Prevent the default scrolling behavior
        
        // Update the scale with improved zoom sensitivity
        const zoomSensitivity = 0.0007;
        const newScale = this.scale() * (1 - event.deltaY * zoomSensitivity);
        
        // Set a minimum scale to prevent zooming out too far
        this.scale.set(Math.max(0.01, newScale));

        // Clamp the current position after scale change
        const clampedPosition = this.clampPosition(this.boardPosition().x, this.boardPosition().y);
        this.boardPosition.set(clampedPosition);

        // Apply both translation and scale transforms to maintain position
        const board = this.boardElement.nativeElement;
        board.style.transform = `translate(${clampedPosition.x}px, ${clampedPosition.y}px) scale(${this.scale()})`;
        board.style.transformOrigin = 'center center';
      });
    }
  }

  toggleGrabbingBoard() {
    this.grabbingBoard.update((current) => !current);
  }

  handleOnMouseUp() {
    this.grabbingBoard.set(false);
    this.clickedPosition.set({ x: -1, y: -1 });
  }

  handleOnMouseDown(event: MouseEvent) {
    this.grabbingBoard.set(true);
    this.clickedPosition.set({ x: event.x, y: event.y });
  }

  handleOnMouseMove(event: MouseEvent) {
    if (this.grabbingBoard() && this.clickedPosition().x >= 0 && this.clickedPosition().y >= 0) {
      // Get the difference between the current mouse position and the original clicked position
      const dx = event.x - this.clickedPosition().x;
      const dy = event.y - this.clickedPosition().y;

      // Update the board position with the accumulated movement
      const newX = this.boardPosition().x + dx;
      const newY = this.boardPosition().y + dy;
      
      // Clamp the position to prevent going out of bounds
      const clampedPosition = this.clampPosition(newX, newY);
      
      const board = this.boardElement.nativeElement;
      board.style.transform = `translate(${clampedPosition.x}px, ${clampedPosition.y}px) scale(${this.scale()})`;
      board.style.transformOrigin = 'center center';

      // Update clicked position for the next move
      this.clickedPosition.set({ x: event.x, y: event.y });
      // Store the new position
      this.boardPosition.set(clampedPosition);
    }
  }
}

