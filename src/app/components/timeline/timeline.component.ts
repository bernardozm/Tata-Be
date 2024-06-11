import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  imports: [CommonModule, WebcamModule],
})
export class TimelineComponent implements OnInit {
  timelineItems = [
    {
      image: 'assets/images/image1.jpg',
      title: 'Nosso Primeiro Encontro',
      description: 'Foi um dia inesquecível...',
    },
    {
      image: 'assets/images/image2.jpg',
      title: 'Viagem Juntos',
      description: 'Nossa primeira viagem para a praia...',
    },
    {
      image: 'assets/images/image3.jpg',
      title: 'Aniversário Surpresa',
      description: 'Aquele aniversário especial...',
    },
    {
      image: 'assets/images/image4.jpg',
      title: 'Passeio no Parque',
      description: 'Um dia relaxante no parque...',
    },
    {
      image: 'assets/images/image5.jpg',
      title: 'Jantar Romântico',
      description: 'Nosso jantar romântico à luz de velas...',
    },
  ];

  // Propriedades da Webcam
  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    const cachedImage = localStorage.getItem('timelinePhoto');
    if (cachedImage) {
      this.timelineItems.push({
        image: cachedImage,
        title: 'Foto Capturada',
        description: 'Esta é a foto que você tirou!',
      });
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    const photo = webcamImage.imageAsDataUrl;
    this.timelineItems.push({
      image: photo,
      title: 'Foto Capturada',
      description: 'Esta é a foto que você tirou!',
    });
    localStorage.setItem('timelinePhoto', photo);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
