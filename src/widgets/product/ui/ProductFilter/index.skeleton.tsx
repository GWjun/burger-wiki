import Skeleton from '#shared/ui/Skeleton';
import { container } from './styles.css';

export function ProductFilterSkeleton() {
  return (
    <div className={container} role="status">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <Skeleton
            style={{ marginTop: '20px', width: '200px', height: '20px' }}
          />
          <Skeleton
            style={{ marginTop: '15px', width: '100px', height: '16px' }}
          />
          <Skeleton
            style={{ marginTop: '15px', width: '100px', height: '16px' }}
          />
          <Skeleton
            style={{ marginTop: '15px', width: '100px', height: '16px' }}
          />
          <Skeleton
            style={{
              marginTop: '15px',
              width: '100px',
              height: '16px',
              marginBottom: '15px',
            }}
          />
        </div>
      ))}
    </div>
  );
}
